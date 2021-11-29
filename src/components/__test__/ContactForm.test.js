import React from "react";
import {
  render,
  screen,
  fireEvent,
  getByLabelText,
  waitFor,
} from "@testing-library/react";
import ContactForm from "../ContactForm";
import ContactPage from "../ContactPage";

const errorMessage = "**** ERROR ****";
const successResult = "API REPLY";
const getSuccess = jest.fn(() => Promise.resolve(successResult));
const getFail =jest.fn(() => Promise.reject(new Error()));

describe("displays correct thing when API response is succesfull", () => {
  test("API TEST Success", async () => {
    const { queryByLabelText } = render(<ContactPage get={getSuccess} />);

    const stateBeforePost = queryByLabelText(/isSent/i);
    
    expect(stateBeforePost).toBeFalsy();

    const button = screen.getByText(/send/i);

    fireEvent.click(button);

    const renderedComponent = await waitFor(() => screen.getByText(/Form/));

    expect(renderedComponent).toBeInTheDocument();
  });
});

describe("displays correct thing when API response is NOT succesfull", () => {
   test("API TEST Fail", async () => {
    const { queryByLabelText } = render(<ContactPage get={getFail} />);

    const stateBeforePost = queryByLabelText(/isSent/i);

    expect(stateBeforePost).toBeFalsy();

    const button = screen.getByText(/send/i);

    fireEvent.click(button);

    const renderedComponent = await waitFor(() =>screen.getByText(/Please Contact Us Using the Form Below/));

     expect(renderedComponent).toBeInTheDocument();
    
  });
 });

test("should check if the page rendered as it should be-contact form", async () => {
  render(<ContactForm />);

  const contactFormSentence = screen.getByText(/Please Contact Us/i);

  expect(contactFormSentence).toBeInTheDocument();
});

describe("handleNameChange", () => {
  test("should render input element:name", async () => {
    render(<ContactForm />);

    const inputElement = screen.getByPlaceholderText(/Name/i);

    fireEvent.change(inputElement, { target: { value: "John Doe" } });

    expect(inputElement.value).toBe("John Doe");
  });
});

describe("handleEmailChange", () => {
  test("should render input element:email", async () => {
    render(<ContactForm />);

    const inputElement = screen.getByPlaceholderText(/Email/i);

    fireEvent.change(inputElement, { target: { value: "John@doe.com" } });

    expect(inputElement.value).toBe("John@doe.com");
  });
});

describe("handleMessageChange", () => {
  test("should render input element:message", async () => {
    render(<ContactForm />);

    const inputElement = screen.getByPlaceholderText(/Message/i);

    fireEvent.change(inputElement, {
      target: { value: "Just a mock message" },
    });

    expect(inputElement.value).toBe("Just a mock message");
  });
});

describe("handleSubmit", () => {
  test("should submit values when submit button clicked", async () => {
    render(<ContactForm />);

    const inputElementMessage = screen.getByPlaceholderText(/Message/i);
    fireEvent.change(inputElementMessage, {
      target: { value: "Just a mock message" },
    });

    const inputElementEmail = screen.getByPlaceholderText(/Email/i);
    fireEvent.change(inputElementEmail, { target: { value: "john@doe.com" } });

    const inputElementName = screen.getByPlaceholderText(/Name/i);
    fireEvent.change(inputElementName, { target: { value: "John Doe" } });

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(inputElementName.value).toBe("John Doe");
    expect(inputElementEmail.value).toBe("john@doe.com");
    expect(inputElementMessage.value).toBe("Just a mock message");
  });
});  
