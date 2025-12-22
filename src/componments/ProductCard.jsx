
import { Link } from "react-router";


function ProductCard({ products }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaanNHkH2UQYCzyN0i-jO3g2Ct_4I-KsWylQ&s"
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                {/* Category Badge */}
                {product.category && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {product.category.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                  {product.name}
                </h2>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {product.description}
                </p>

                {/* Price and Action */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-green-600">
                      ${product.price}
                    </span>
                    <span className="text-xs text-gray-500">USD</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default ProductCard;
