import { axiosGet } from "../config/axios";

const getReviews = async (id: string) => {
  const review = await axiosGet({ link: `/review/${id}` });
  return review;
};

export { getReviews };
