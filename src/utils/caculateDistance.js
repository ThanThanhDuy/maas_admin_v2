export function caculateDistance(distance) {
  return distance < 1000 ? `${distance}m` : `${(distance / 1000).toFixed(1)}km`;
}
