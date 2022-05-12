import Carousel from './Carousel';
import styled from 'styled-components';

const dummy_slides = Array.from({ length: 10 }).fill('');

const StyledContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 30rem;
	width: 100%;
	background-color: red;
`;

function App() {
	return (
		<div className="App">
			<Carousel config={{ perView: 2 }}>
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
