interface LPAchievement {
  _id?: string;
  title?: string;
  subtitle?: string;
  images?: Array<string>;
}

interface LPFeatured {
  _id?: string;
  propertyName?: string;
  price?: string;
  img?: string;
  ownerImage?: string;
  ownerName?: string;
  place?: string;
  tag?: string;
}

interface LPReview {
  _id?: string;
  reviewTitle?: string;
  review?: string;
  rating?: number;
  reviewerName?: string;
  reviewerImage?: string;
  reviewerdes?: string;
  bgImageUrl?: string;
}
