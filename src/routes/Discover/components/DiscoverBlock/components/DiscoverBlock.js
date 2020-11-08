import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DiscoverItem from './DiscoverItem';
import '../styles/_discover-block.scss';

const DiscoverBlock = (props) => {
  const { text, id, data, imagesKey = 'images', getNextRecords } = props;
  const scrollContainer = (id, { isNegative } = {}) => {
    return () => {
      const scrollableContainer = document.getElementById(id);
      const amount = isNegative ? -scrollableContainer.offsetWidth : scrollableContainer.offsetWidth;
      const scrollValue = scrollableContainer.scrollLeft + amount;
      scrollableContainer.scrollLeft = scrollValue
      if(scrollValue + amount > scrollableContainer.scrollWidth) {
        // Getting next set of items before reaching to end
        getNextRecords && getNextRecords()
      }
    };
  }
  return (
    <div className="discover-block">
      <div className="discover-block__header">
        <h2>{text}</h2>
        <span />
        {
          data.length ? (
            <div className="animate__animated animate__fadeIn">
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={scrollContainer(id, { isNegative: true })}
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                onClick={scrollContainer(id)}
              />
            </div>
          ) : null
        }
      </div>
      <div className="discover-block__row" id={id}>
        {data.map(({ [imagesKey]: images, name }) => (
          <DiscoverItem key={name} images={images} name={name} />
        ))}
      </div>
    </div>
  );
}

export default DiscoverBlock;
