const TextToSvgComponent = ({ className = '', style = {}, fill = '#000000', ...props }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '-20px' }}>
      <img src="/src/assets/images/logo.png" width={50} height={50} alt="" />
      <h2>EcoMarket</h2>
    </div>
  );
};

export default TextToSvgComponent;
