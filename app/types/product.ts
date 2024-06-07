interface Product {
  id: string;
  title_fa: string;
  Brand: string;
  Category1: string | null;
  Category2: string | null;
  comment: string | null;
}

const isProduct = (item: any) => {
  if (!item.id) return false;
  if (!item.title_fa) return false;

  return true;
};

export default Product;
export { isProduct };
