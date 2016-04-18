class SearchBar extends React.Component {

    handleChange() {
        this.props.onUserInput(
            this.refs.filterTextInput.value,
            this.refs.inStockOnlyInput.checked
        );
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.searchText}
                    ref="filterTextInput"
                    onChange={this.handleChange.bind(this)}
                />
                <label>
                <input
                    type="checkbox"
                    checked={this.props.inStock}
                    ref="inStockOnlyInput"
                    onChange={this.handleChange.bind(this)}
                /> Only stocked products
            </label>
            </form>

        )
    }

}
class ProductTable extends React.Component {
    render() {

        console.log(this.props.products);

        let rows = [];
        let lastCategory = null;

        this.props.products.forEach((product) => {


            if (product.name.toLowerCase().indexOf(this.props.searchText.toLowerCase()) == -1 || (this.props.inStock && product.stocked == false)) {
                return;
            }

            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category}/>)
            }


            rows.push(<ProductRow product={product} key={product.name}/>);
            lastCategory = product.category;
        });

        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                { rows}
                </tbody>
            </table>
        )
    }
}

class ProductCategoryRow extends React.Component {
    render() {
        return <tr>
            <th colSpan="2">{this.props.category}</th>
        </tr>;
    }
}
class ProductRow extends React.Component {
    render() {

        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>{ this.props.product.name }</span>;

        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        )
    }
}


class FilterableProductTable extends React.Component {
    constructor() {
        super();

        this.state = {
            searchText: '',
            inStock: false
        }
    }

    handleUserInput(searchText, inStock) {
        this.setState({
            searchText: searchText,
            inStock: inStock
        })
    }

    render() {
        return (
            <div className="FilterableProductTable">
                <SearchBar onUserInput={this.handleUserInput.bind(this)} searchText={this.state.searchText}
                           inStock={this.state.inStock}/>
                <ProductTable products={this.props.products} searchText={this.state.searchText}
                              inStock={this.state.inStock}/>
            </div>
        )
    }
}

var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS}/>,
    document.getElementById('content')
);