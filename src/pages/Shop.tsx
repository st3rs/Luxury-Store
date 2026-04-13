import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/src/components/ProductCard';
import QuickViewModal from '@/src/components/QuickViewModal';
import { Filter, ChevronDown, Search } from 'lucide-react';
import Fuse from 'fuse.js';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);

  const selectedBrandId = searchParams.get('brand');
  const selectedCategoryId = searchParams.get('category');

  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by Brand
    if (selectedBrandId) {
      result = result.filter((p: any) => p.brandId === selectedBrandId);
    }

    // Filter by Category
    if (selectedCategoryId) {
      result = result.filter((p: any) => p.categoryId === selectedCategoryId);
    }

    if (!searchTerm.trim()) return result;

    const fuse = new Fuse(result, {
      keys: [
        'name',
        'description',
        'shortDescription',
        'brand.name',
        'category.name',
        'material',
        'color',
        'sku'
      ],
      threshold: 0.3,
      ignoreLocation: true,
      includeScore: true
    });

    return fuse.search(searchTerm).map(res => res.item);
  }, [products, searchTerm, selectedBrandId]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/products').then(res => res.json()),
      fetch('/api/brands').then(res => res.json()),
      fetch('/api/categories').then(res => res.json())
    ])
      .then(([productsData, brandsData, categoriesData]) => {
        if (Array.isArray(productsData)) setProducts(productsData);
        if (Array.isArray(brandsData)) setBrands(brandsData);
        if (Array.isArray(categoriesData)) setCategories(categoriesData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleBrandChange = (brandId: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (brandId) {
      newParams.set('brand', brandId);
    } else {
      newParams.delete('brand');
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (categoryId: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (categoryId) {
      newParams.set('category', categoryId);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">The Collection</h1>
        <p className="text-gray-500 font-light max-w-2xl mx-auto">
          Explore our curated selection of authentic luxury handbags, accessories, and more.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-y border-gray-100 py-6">
        <div className="flex items-center space-x-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <button className="flex items-center space-x-2 text-sm font-bold text-brand-dark hover:text-brand-royal transition-colors">
            <Filter size={18} />
            <span>FILTERS</span>
          </button>
          <div className="h-4 w-[1px] bg-gray-200" />
          <div className="relative group">
            <select 
              value={selectedBrandId || ''} 
              onChange={(e) => handleBrandChange(e.target.value)}
              className="appearance-none bg-transparent pr-8 text-sm font-medium text-gray-500 hover:text-brand-royal transition-colors cursor-pointer outline-none"
            >
              <option value="">ALL BRANDS</option>
              {brands.map((brand: any) => (
                <option key={brand.id} value={brand.id}>{brand.name.toUpperCase()}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
          <div className="relative group">
            <select 
              value={selectedCategoryId || ''} 
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="appearance-none bg-transparent pr-8 text-sm font-medium text-gray-500 hover:text-brand-royal transition-colors cursor-pointer outline-none"
            >
              <option value="">ALL CATEGORIES</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
          <button className="flex items-center space-x-1 text-sm font-medium text-gray-500 hover:text-brand-royal transition-colors">
            <span>PRICE</span>
            <ChevronDown size={14} />
          </button>
          {(selectedBrandId || selectedCategoryId) && (
            <button 
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.delete('brand');
                newParams.delete('category');
                setSearchParams(newParams);
              }}
              className="text-xs font-bold text-brand-royal hover:underline ml-4"
            >
              CLEAR ALL
            </button>
          )}
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-10 py-2 bg-brand-soft border-none rounded-full text-sm focus:ring-1 focus:ring-brand-royal transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-royal transition-colors"
            >
              <span className="text-lg">&times;</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="animate-pulse space-y-4">
              <div className="aspect-[4/5] bg-gray-100 rounded-lg" />
              <div className="h-4 bg-gray-100 w-1/2 rounded" />
              <div className="h-4 bg-gray-100 w-3/4 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">No products found matching "{searchTerm}".</p>
            </div>
          )}
        </>
      )}

      <QuickViewModal 
        product={quickViewProduct} 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
    </div>
  );
}
