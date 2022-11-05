import "./directory-item.styles.jsx";
import { BackgroundImage, DirectoryItemContainer, Body } from "./directory-item.styles.jsx";

const DirectoryItem = (props) => {
  const { imageUrl, title } = props.category;

  return (
    <DirectoryItemContainer >
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Show Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
