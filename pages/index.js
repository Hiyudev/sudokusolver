import styled from 'styled-components';
import HeroSection from '@layouts/Hero';
import FooterSection from '@layouts/Footer';
import Section from '@layouts/Section';
import Title from '@components/Title';
import Image from 'next/image';

import photosImage from '@public/icons/Photos.svg';
import manualImage from '@public/icons/FingerSudoku.svg';
import solutionImage from '@public/icons/Solution.svg';
import devImage from '@public/icons/Dev.svg';

const Wave = styled.div`
  transform: ${props => props.flip ? 'rotate(180deg)' : ''};

  svg > path {
    fill: ${({theme}) => theme.main.light}
  }
`

const WaveImage = ({flipped}) => (
  <Wave flip={flipped}>
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        fillOpacity="1"
      ></path>
    </svg>
  </Wave>
);

const Body = styled.div`
  min-height: 100vh;
  background-color: ${({theme}) => theme.main.dark};
  color: ${({theme}) => theme.main.color};
`;

Body.Content = styled.div`
  display: flex;
  gap: 2rem;
  padding-top: 3rem;
  flex-direction: column;
`;

function Home() {
  return (
    <Body>
      <HeroSection />

      <Body.Content>
        <section>
          <Section>
            <div>
              <Title>Image detection</Title>
              <p>
                Point or drag an image that contains sudoku to be analyzed and
                automatically placed the numbers.
              </p>
            </div>

            <Image width={500} src={photosImage} />
          </Section>
          
          <WaveImage flipped />

          <Section rowrevert diffbg>
            <div>
              <Title>Manually selection</Title>
              <p>Manually enter the numbers if you don't have the image.</p>
            </div>

            <Image width={500} src={manualImage} />
          </Section>

          <WaveImage />

          <Section>
            <div>
              <Title>Solution</Title>
              <p>Click with a button to see the sudoku solution.</p>
            </div>
            <Image width={500} src={solutionImage} />
          </Section>

          <WaveImage flipped />

          <Section ignorecenter diffbg>
            <div>
              <Title>Technology used</Title>

              <p>For the client-side, i used:</p>
              <ul>
                <li>Javascript</li>
                <li>Next.js</li>
                <li>React.js</li>
                <li>Styled-components</li>
              </ul>
              <p>For the server-side, i used:</p>
              <ul>
                <li>Python</li>
                <li>FastAPI</li>
                <li>OpenCV</li>
                <li>Tensorflow</li>
              </ul>
            </div>

            <Image src={devImage} />
          </Section>
          
          <WaveImage />
        </section>


        <FooterSection />
      </Body.Content>
    </Body>
  );
}

export default Home;
