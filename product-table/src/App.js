import React, { useState } from 'react';
import products from './products'

const ProductRow = ({ product }) => {
  const name = product.stocked ? product.name : 
  <span style={{color: 'red'}} >{product.name}</span>

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

const ProductCategory = ({ product }) => {
  return (
    <tr>
      <th colSpan={2} className='category'>{product.category}</th>
    </tr>
  )
}

const ProductTable =({ products, filterText, inStockOnly }) => {
  const rows = []
  let lastCategory = null

  function compare(a,b) {
    if (a.category < b.category)
       return -1;
    if (a.category > b.category)
      return 1;
    return 0;
  }

  products.sort(compare)
  products.forEach((product) => {

    if (inStockOnly && !product.stocked) return;

    if (!product.name.toLowerCase().includes(filterText.toLowerCase())) return;

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategory 
          product={product}
          key={product.category}
        />
      )
    }

    rows.push(
      <ProductRow 
        product={product}
        key={product.name}
      />
    )

    lastCategory = product.category
  })


  return (
    <table className='product-table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

const SearchBar = ({ inStockOnly, filterText, setInStockOnly, setFilterText}) => {
  return (
    <form className='search-bar'>
      <input 
        type="text" 
        onChange={(e) => setFilterText(e.target.value)}

      />
      <label>
        <input 
          type="checkbox"
          onChange={(e) => setInStockOnly(e.target.checked)}
        />
        Only show stocked products
      </label>
    </form>
  )
}

const FilterableProductTable = ({ products }) => {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)

  return (
    <div className='app'>
      <SearchBar 
        inStockOnly={inStockOnly}
        filterText={filterText}
        setInStockOnly={setInStockOnly}
        setFilterText={setFilterText}
      />
      <ProductTable 
        products={products}
        inStockOnly={inStockOnly}
        filterText={filterText}
      />
    </div>
  )
}

const App = () => {
  return <FilterableProductTable products={products} />
}

export default App;