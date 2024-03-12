function Feature(props) {
    const { img, alt, title } = props;
    return (
      <div className="feature-item">
        <img src={img} alt={alt} className="feature-icon" />
        <h3 className="feature-item-title">{title}</h3>
        <p>{props.text}</p>
      </div>
    );
  }
  
  export default Feature;
  
  //Le composant rend une structure HTML avec une image, un titre et un texte.