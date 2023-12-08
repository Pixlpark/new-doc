import Link from '@docusaurus/Link';
import categories from './categories.json'

export default function Main() {
  const listItems = categories.map((category) =>
    <li className='section'>
      <Link to={'category/' + category?.title} className="section-link">
        <div className="section-title">{category?.title}</div>
        <div className="section-description">{category?.description}</div>
      </Link>
    </li>
  );
  return (
    <div className='main'>
      <ul className="sections">{listItems}</ul>
    </div>
  );
}

