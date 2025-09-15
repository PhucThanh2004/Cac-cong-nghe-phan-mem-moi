require("dotenv").config();
const mongoose = require('mongoose');
const Product = require('../src/models/productModel.js'); // đúng đường dẫn model của bạn
const connection = require('../src/config/database.js'); // đúng đường dẫn
const elasticClient = require('../src/config/elastic.js'); // Đảm bảo đúng đường dẫn
const seedProducts = async () => {
  await connection();

  const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    price: 1200,
    description: 'Flagship điện thoại từ Apple',
    category: 'electronics',
    imageUrl: 'https://bachlongstore.vn/vnt_upload/product/10_2023/iii2.png',
  },
  {
    name: 'MacBook Air M3',
    price: 1500,
    description: 'Laptop siêu nhẹ, hiệu suất mạnh mẽ',
    category: 'electronics',
    imageUrl: 'https://bizweb.dktcdn.net/100/444/581/products/macbook-air-2018-42-700x700-jpeg-7d252f07-d9e4-436b-bf05-a33d6bd3a4af.jpg?v=1723091739007',
  },
  {
    name: 'Sách học React',
    price: 30,
    description: 'Hướng dẫn học React từ cơ bản đến nâng cao',
    category: 'books',
    imageUrl: 'https://vntalking.com/wp-content/uploads/2020/08/ReactJS-Cover_v3.png',
  },
  {
    name: 'Áo hoodie nam',
    price: 25,
    description: 'Chất vải cotton, mặc thoáng mát',
    category: 'clothing',
    imageUrl: 'https://image.hm.com/assets/hm/82/72/8272a84db83592448ab37910e608e882fa502677.jpg?imwidth=1260',
  },
  // ---- Thêm 10 sản phẩm mới ----
  {
    name: 'Samsung Galaxy S24',
    price: 1100,
    description: 'Điện thoại flagship của Samsung với camera AI',
    category: 'electronics',
    imageUrl: 'https://cdn.movertix.com/media/catalog/product/cache/image/1200x/s/a/samsung-galaxy-s24-5g-onyx-black-128gb-and-8gb-ram-sm-s921b.jpg',
  },
  {
    name: 'Tai nghe AirPods Pro 2',
    price: 250,
    description: 'Tai nghe không dây chống ồn chủ động',
    category: 'electronics',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83',
  },
  {
    name: 'Giày sneaker Nike Air Force 1',
    price: 90,
    description: 'Giày thể thao huyền thoại của Nike',
    category: 'clothing',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fb1ef5b9-3f6c-4e6e-9ab8-880fa38eae5d/air-force-1-07-shoes-ls7TT9.png',
  },
  {
    name: 'Bàn phím cơ Keychron K6',
    price: 80,
    description: 'Bàn phím cơ không dây gọn nhẹ',
    category: 'electronics',
    imageUrl: 'https://nguyencongpc.vn/photos/20/B%C3%A0n%20ph%C3%ADm%20c%C6%A1%20Keychron%20K6%20RGB%20-%20(%20Aluminum%20Bezel%20)/B%C3%A0n%20ph%C3%ADm%20c%C6%A1%20Keychron%20K6%20RGB%20-%20(%20Aluminum%20Bezel%20)%204.jpg',
  },
  {
    name: 'Bộ ấm trà gốm sứ Bát Tràng',
    price: 45,
    description: 'Ấm chén men lam truyền thống',
    category: 'home',
    imageUrl: 'https://gomsuhcm.com/wp-content/uploads/2019/07/bo-am-tra-tu-sa-09.jpg',
  },
  {
    name: 'Kem dưỡng da CeraVe',
    price: 15,
    description: 'Kem dưỡng ẩm cho da khô',
    category: 'beauty',
    imageUrl: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P25101_1.jpg',
  },
  {
    name: 'Vợt cầu lông Yonex Astrox 100ZZ',
    price: 200,
    description: 'Vợt cao cấp dành cho vận động viên chuyên nghiệp',
    category: 'sports',
    imageUrl: 'https://cdn.hvshop.vn/wp-content/uploads/2023/11/set-yonex-astrox-100zz-limited-2023.jpg',
  },
  {
    name: 'Sách Clean Code',
    price: 35,
    description: 'Robert C. Martin - Lập trình sạch',
    category: 'books',
    imageUrl: 'https://cdn1.fahasa.com/media/catalog/product/8/9/8936107813361.jpg',
  },
  {
    name: 'Áo sơ mi nam trắng',
    price: 20,
    description: 'Sơ mi cotton cao cấp, phong cách công sở',
    category: 'clothing',
    imageUrl: 'https://product.hstatic.net/200000588671/product/ao-so-mi-nam-bycotton-trang-art-nhan_8ec622a241ea4deb93a02bdbdcb87954_1024x1024.jpg',
  },
  {
    name: 'Máy hút bụi Dyson V15',
    price: 600,
    description: 'Máy hút bụi không dây mạnh mẽ',
    category: 'home',
    imageUrl: 'https://cdn8.web4s.vn/media/products/443/29032021050359_368340_01_png.jpg',
  },
];
  try {
    // Xóa dữ liệu cũ trong MongoDB
    await Product.deleteMany();

    // Xóa index cũ trong Elasticsearch
    await elasticClient.indices.delete({ index: "products", ignore_unavailable: true });

    // Tạo lại index với mapping chuẩn
    await elasticClient.indices.create({
      index: "products",
      mappings: {
        properties: {
          name: { type: "text" },
          description: { type: "text" },
          category: { type: "keyword" }, // keyword để filter
          price: { type: "float" },
          imageUrl: { type: "keyword" },
        },
      },
    });

    // Thêm dữ liệu vào MongoDB
    const result = await Product.insertMany(sampleProducts);
    console.log(`✅ Đã thêm ${result.length} sản phẩm vào MongoDB.`);

    // Đồng bộ dữ liệu sang Elasticsearch
    const operations = result.flatMap((doc) => [
      { index: { _index: "products", _id: doc._id.toString() } },
      {
        name: doc.name,
        description: doc.description,
        category: doc.category,
        price: doc.price,
        imageUrl: doc.imageUrl,
      },
    ]);

    await elasticClient.bulk({ refresh: true, operations });
    console.log(`✅ Đã đồng bộ ${result.length} sản phẩm vào Elasticsearch.`);
  } catch (error) {
    console.error("❌ Lỗi khi seed:", error);
  } finally {
    // Chỉ đóng sau khi xong
    mongoose.connection.close();
  }
};

seedProducts();