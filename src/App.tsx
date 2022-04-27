import Carousel from './Carousel';
import { useCarousel } from './hooks/useCarousel';
import styled from 'styled-components';

const dummy_slides = Array.from({ length: 10 }).fill('');
const perView = 3;

const StyledContent = styled.div`
	height: 30rem;
	width: 100%;
	background-color: red;
`;

function App() {
  const options = useCarousel(perView);

  return (
    <div className="App">
      <Carousel options={options} slidesPerView={perView}>
        {dummy_slides.map((_, index) => (
          <StyledContent key={index}>
            <h1>{index + 1}</h1>
          </StyledContent>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
