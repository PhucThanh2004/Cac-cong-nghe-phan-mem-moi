const { Client } = require('@elastic/elasticsearch');

// Cấu hình client kết nối đến Elasticsearch
const client = new Client({
  node: process.env.ELASTIC_SEARCH_URL || 'http://localhost:9200',
});

module.exports = client;