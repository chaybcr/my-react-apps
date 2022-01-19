import Greeting from './Greeting';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Greeting Component',()=>{
    test('renders Hello World as a text',()=>{
        //Arrange
    render(<Greeting />);
    //Act
    
    //Assert
     const helloworldElement = screen.getByText('Hello world',{exact:true});
     expect(helloworldElement).toBeInTheDocument();
    
    });

    test('renders  good to see you if the button was not clicked',()=>{
        render(<Greeting />);

        const outputElement = screen.getByText('good to see you',{exact:false});
     expect(outputElement).toBeInTheDocument();
    });

    test('renders changes if the button was clicke',()=>{
        //Arrange
        render(<Greeting />);

        //Act
        const btnElement = screen.getByRole('button');
        userEvent.click(btnElement);

          //Assert
          const outputElement = screen.getByText('Changed',{exact:false});
     expect(outputElement).toBeInTheDocument();
    });

    test('does not render good to see you if the button was clicked',()=>{
         //Arrange
         render(<Greeting />);

         //Act
         const btnElement = screen.getByRole('button');
         userEvent.click(btnElement);
 
           //Assert
           const outputElement = screen.queryByText('good to see you',{exact:false});
      expect(outputElement).toBeNull();
    })
})

