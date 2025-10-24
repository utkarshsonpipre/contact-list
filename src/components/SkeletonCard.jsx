import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-header" />
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-name" />
        <div className="skeleton-line skeleton-email" />
        <div className="skeleton-line skeleton-phone" />
      </div>
    </div>
  );
};

export default SkeletonCard;
