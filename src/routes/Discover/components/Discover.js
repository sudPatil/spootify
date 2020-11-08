import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import {
  getNewReleases, playLists, getCategories,
  getNextCategories, getNextReleases, getNextPlayLists
} from '../api'

export default class Discover extends Component {
  constructor() {
    super();
    this.state = {
      newReleases: {
        items: [],
        next: ''
      },
      playlists: {
        items: [],
        next: ''
      },
      categories: {
        items: [],
        next: ''
      }
    };
  }

  componentDidMount() {
    Promise.all([
      getNewReleases(),
      playLists(),
      getCategories()
    ]).then(([newReleases, featuredPlayList, categories]) => {
      this.setState({
        newReleases,
        playlists: featuredPlayList,
        categories
      })
    })
  }

  getNextReleasedItems = () => {
    const { newReleases: { next, items } } = this.state;
    next && getNextReleases(next).then((result) => this.setState({
      newReleases: {
        items: [...items, ...result.items],
        next: result.next
      }
    }))
  }

  getNextPlaylist = () => {
    const { playlists: { next, items } } = this.state;
    next && getNextPlayLists(next).then((result) => this.setState({
      playlists: {
        items: [...items, ...result.items],
        next: result.next
      }
    }))
  }

  getNextCategoryData = () => {
    const { categories: { next, items } } = this.state;
    next && getNextCategories(next).then((result) => this.setState({
      categories: {
        items: [...items, ...result.items],
        next: result.next
      }
    }))
  }

  render() {
    const { newReleases, playlists, categories } = this.state;
    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases.items}
          getNextRecords={this.getNextReleasedItems} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists.items}
          getNextRecords={this.getNextPlaylist} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories.items} imagesKey="icons"
          getNextRecords={this.getNextCategoryData} />
      </div>
    );
  }
}
