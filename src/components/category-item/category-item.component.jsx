import './category-item.styles.scss';

const CategoryItem = (props) => {
    const { title } = props.category;

    return (
        <div className='category-container'>
            <div className='background-image'/>
            <div className='category-body-container'>
            <h2>{title}</h2>
            <p>Show Now</p>
            </div>
        </div>
    )
}

export default CategoryItem;