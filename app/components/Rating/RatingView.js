import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { calculateRating } from '../../Utils/index';
import { styles } from './RatingView.styles';
import { PLAY_ICON_BG_COLOR } from '../../utils/constants';

// Sizes can be 1 or 2
export const RatingView = ({
  ratingScore,
  totalRating,
  totalCount,
  size = 2,
  showCount = true,
}) => {
  const ratingArray = calculateRating(ratingScore, totalRating);
  return (
    <div style={styles.ratingViewParent}>
      {ratingArray.map((rate, index) => {
        if (rate === 1)
          return (
            <FontAwesomeIcon
              key={index}
              size="1x" icon={faStar}
              color={PLAY_ICON_BG_COLOR}
            />
          );
        if (rate === 0.5)
          return (
            <FontAwesomeIcon
            key={index}

              size="1x" icon={faStarHalfAlt}
              color={PLAY_ICON_BG_COLOR}
            />
          );
        return (
          <FontAwesomeIcon
          key={index}

            size="1x" icon={faStarEmpty}
            color={PLAY_ICON_BG_COLOR}
          />
        )
      })}
      {showCount && (
        <div style={styles.ratingViewTotalCount}>{`(${totalCount || 0})`}</div>
      )}
    </div>
  );
};
