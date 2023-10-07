import { useState, useContext } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { grey3 } from "@/lib/colors";
import UtilityFunctions from "@/lib/utilityFunctions";
import { smallBorderRadius } from "@/lib/constants";
import { deliveryInfo } from "@/lib/deliveryInfo";
import { CartContext } from "./CartContext";
import Button from "./Button";
import Loader from "./Loader";
import WhiteBox from "./WhiteBox";

const customerInfoBox = css`
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid ${grey3};
  border-radius: ${smallBorderRadius}px;
  box-sizing: border-box;
  font-size: 1rem;
`;

const Input = styled.input`
  ${customerInfoBox}
`;

const Select = styled.select`
  ${customerInfoBox}
`;

const SameLine = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 0;
  margin-bottom: 10px;
  font-size: 0.8rem;
`;

const ErrorDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: red;
`;

export default function CartForm() {
  const { cartProducts } = useContext(CartContext);
  const [formState, setFormState] = useState({
    customerInfo: {
      name: "",
      email: "",
      streetAddress: "",
      city: "",
      postalCode: "",
      country: "Perú", // We only ship to Peru
      phoneNumber: "",
      idNumber: "",
    },
    errors: {
      name: "",
      email: "",
      streetAddress: "",
      city: "",
      postalCode: "",
      country: "",
      phoneNumber: "",
      idNumber: "",
    },
  });
  const validationMessages = {
    name: "Invalid name",
    email: "Invalid email",
    streetAddress: "Invalid street address",
    city: "Invalid city",
    postalCode: "Invalid postal code",
    country: "Invalid country",
    phoneNumber: "Invalid phone number",
    idNumber: "Invalid ID number",
  };
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  let cities = [];
  for (const area in deliveryInfo) {
    cities.push(...deliveryInfo[area].districts);
  }
  cities = cities.sort();

  function containsNumbers(str) {
    return /\d/.test(str);
  }

  function containsLetters(str) {
    return /[a-zA-Z]/.test(str);
  }

  function normalizeAndTrimString(str) {
    let newString = str.toLowerCase().trim();
    newString = newString.replace(/ {2,}/g, " ");
    return newString;
  }

  function validateForm() {
    const maxCharacters = 50;
    const { customerInfo } = formState;
    const newErrors = {};

    Object.entries(customerInfo).forEach(([key, value]) => {
      value = key === "city" ? value : normalizeAndTrimString(value);
      switch (key) {
        case "name":
          if (
            value === "" ||
            containsNumbers(value) ||
            value.length > maxCharacters
          ) {
            newErrors.name = validationMessages.name;
          }
          break;
        case "email":
          if (
            value === "" ||
            !UtilityFunctions.isValidEmail(value) ||
            value.length > maxCharacters
          ) {
            newErrors.email = validationMessages.email;
          }
          break;
        case "streetAddress":
          if (value === "" || value.length > maxCharacters) {
            newErrors.streetAddress = validationMessages.streetAddress;
          }
          break;
        case "city":
          if (
            value === "" ||
            containsNumbers(value) ||
            value.length > maxCharacters
          ) {
            newErrors.city = validationMessages.city;
          }
          break;
        case "country":
          if (
            value === "" ||
            containsNumbers(value) ||
            value.length > maxCharacters
          ) {
            newErrors.country = validationMessages.country;
          }
          break;
        case "postalCode":
          if (
            value <= 0 ||
            value.length !== 5 ||
            isNaN(value) ||
            containsLetters(value)
          ) {
            newErrors.postalCode = validationMessages.postalCode;
          }
          break;
        case "phoneNumber":
          if (
            value === "" ||
            value.length > maxCharacters ||
            containsLetters(value)
          ) {
            newErrors.phoneNumber = validationMessages.phoneNumber;
          }
          break;
        case "idNumber":
          if (
            value === "" ||
            value.length > maxCharacters ||
            containsLetters(value)
          ) {
            newErrors.idNumber = validationMessages.idNumber;
          }
          break;
        default:
          break;
      }

      setFormState((prevState) => ({
        ...prevState,
        customerInfo: {
          ...prevState.customerInfo,
          [key]: value,
        },
        errors: newErrors,
      }));
    });

    return Object.keys(newErrors).length === 0;
  }

  async function goToPayment() {
    if (!validateForm()) return;
    setLoading(true);
    setErrorMessages([]);
    const { customerInfo } = formState;
    try {
      const res = await axios.post("/api/checkout", {
        customerInfo,
        cartProducts,
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessages(err.response.data.errors);
        console.error("Errors:", err.response.data.errors);
      } else {
        setErrorMessages([
          "Hubo un error al procesar el pago, inténtalo de nuevo más tarde...",
        ]);
        console.error("Problem with payment: " + err);
      }
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      customerInfo: {
        ...prevState.customerInfo,
        [name]: value,
      },
    }));
  }

  function renderInputField(name, type, placeholder) {
    const { customerInfo, errors } = formState;
    return (
      <>
        <Input
          autoFocus={name === "name"}
          value={customerInfo[name]}
          onChange={handleInputChange}
          type={type}
          placeholder={placeholder}
          name={name}
          disabled={name === "country"}
          autoComplete="on"
        />
        {errors[name] && <ErrorMessage>{errors[name]}</ErrorMessage>}
      </>
    );
  }

  function renderCityOptions() {
    return cities.map((city) => (
      <option key={city} value={city}>
        {city}
      </option>
    ));
  }

  return (
    <WhiteBox>
      <h1>Información del pedido</h1>
      {renderInputField("name", "text", "Nombre completo")}
      {renderInputField("email", "email", "Correo electrónico")}
      {renderInputField("streetAddress", "text", "Dirección")}
      <SameLine>
        <div>
          <label htmlFor="city"></label>
          <Select
            id="city"
            name="city"
            value={formState.customerInfo.city}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Ciudad
            </option>
            {renderCityOptions()}
          </Select>
          {formState.errors.city && (
            <ErrorMessage>{formState.errors.city}</ErrorMessage>
          )}
        </div>
        <div>{renderInputField("postalCode", "number", "Código Postal")}</div>
      </SameLine>
      {renderInputField("country", "text", "País")}
      <SameLine>
        <div>
          {renderInputField("phoneNumber", "text", "Número de teléfono")}
        </div>
        <div>
          {renderInputField("idNumber", "text", "Número de identificación")}
        </div>
      </SameLine>
      {loading ? (
        <Loader $small />
      ) : (
        <Button onClick={goToPayment} size="l" $primary $block>
          Continuar con el pago
        </Button>
      )}
      {isError && (
        <ErrorDiv>
          {errorMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </ErrorDiv>
      )}
    </WhiteBox>
  );
}
