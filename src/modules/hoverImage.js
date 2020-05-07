const hoverImage = () => {
  const comand = document.querySelector('.command');
  comand.addEventListener('mouseover', (event) =>{
    if (event.target.matches('.command__photo')) {
      event.target.src = event.target.dataset.img;
    }
    
  });
  comand.addEventListener('mouseout', (event) =>{
    if (event.target.matches('.command__photo')) {
      event.target.src = event.target.dataset.img.replace(/a(?=\.jpg)/gi, '');
    }
  });
};

export default hoverImage;