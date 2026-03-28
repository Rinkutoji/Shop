import Icon from './Icon';

const Stars = ({ rating, size = 14 }) => (
  <div className="stars">
    {[1, 2, 3, 4, 5].map(i => (
      <Icon
        key={i}
        name="star"
        size={size}
        style={{ color: i <= Math.round(rating) ? '#f59e0b' : '#d1d5db' }}
      />
    ))}
  </div>
);

export default Stars;