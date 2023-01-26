import React, {useEffect, useState} from 'react';
import style from './FormBlock.module.scss';
import {InputField} from "../../ui/InputField";
import {RadioGroup} from "@mui/material";
import {RadioButton} from "../../ui/RadioButton";
import {PrimaryButton} from "../../ui/PrimaryButton";
import {InputFieldWithButton} from "../../ui/InputFieldWithButton";
import {URL, getToken} from "../../hooks/Auth";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {SuccessfullyRegistered} from "../successfully-registered/SuccessfullyRegistered";

interface FormBlockProps {
  getUsers: () => void;
}

export const FormBlock: React.FC<FormBlockProps> = ({getUsers}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [positions, setPositions] = useState<IPosition[]>([]);

  const [inputFileValue, setInputFileValue] = useState<string>("Upload your photo");
  const [inputFile, setInputFile] = useState<File | string>("");
  const [inputFileError, setInputFileError] = useState(false);

  const [nameErrorText, setNameErrorText] = useState<string>("");
  const [emailErrorText, setEmailErrorText] = useState<string>("");
  const [phoneErrorText, setPhoneErrorText] = useState<string>("");
  const [inputFileErrorText, setInputFileErrorText] = useState("");

  const [fetching, setFetching] = useState<boolean>(false);

  const [formValid, setFormValid] = useState<boolean>(false);

  const [registered, setRegistered] = useState<boolean>(false);

  const getPositions = async () => {
    try {
      const response = await fetch(`${URL}positions`);
      const request: IPositions = await response.json();
      if (request.success) {
        setPositions(request.positions);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPositions();
  }, []);

  const getImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files) {
      const file = event.target.files[0];
      setInputFileValue(file.name);
      setInputFile(file);

      if (file.size > 5242880) {
        setInputFileError(true);
        setInputFileErrorText("File size must be less then 5Mb");
      }

      if (file.type !== "image/jpeg") {
        setInputFileError(true);
        setInputFileErrorText("File type must be .jpeg or .jpg");
      }

      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = document.createElement("img");

        img.onload = () => {
          if (img.width < 70 || img.height < 70) {
            setInputFileError(true);
            setInputFileErrorText("Image resolution must be at least 70x70px")
          }
        };
        img.src = String(reader.result);
      }
    }
  }

  const onBlurName = (value: string) => {
    if (!value) {
      setNameErrorText("This field must not be empty");
    } else if (value.length < 2 || value.length > 60) {
      setNameErrorText("Username should contain 2-60 characters");
    } else setNameErrorText("");
  }

  const onChangeName = (value: string) => {
    onBlurName(value);
    setName(value);
  }

  const onBlurEmail = (value: string) => {
    const regExp = new RegExp(`^(?:[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])$`);
    if (!value) {
      setEmailErrorText("This field must not be empty");
    } else if (value.length < 2 || value.length > 100) {
      setEmailErrorText("Email should contain 2-60 characters");
    } else if (!regExp.test(value.toLowerCase())) {
      setEmailErrorText("Email is invalid");
    } else setEmailErrorText("");
  }

  const onChangeEmail = (value: string) => {
    onBlurEmail(value);
    setEmail(value);
  }

  const setCursorPosition = (pos: number, elem: EventTarget & HTMLInputElement | HTMLTextAreaElement, setPhone: React.Dispatch<React.SetStateAction<string>>) => {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else { // @ts-ignore
      if (elem.createTextRange) {
        // @ts-ignore
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
        setPhone(range);
      }
    }
  }

  const mask = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.FocusEvent<HTMLInputElement>,
                setPhone: React.Dispatch<React.SetStateAction<string>>,
                setError: React.Dispatch<React.SetStateAction<string>>
  ) => {
    let matrix = `+380_________`,
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = event.target.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;

    if (event.target.value.length > 0 && event.target.value.length < 13) {
      setError("Phone number must be in +380XXXXXXXXX format")
    } else {
      setError("");
    }

    setPhone(matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    }));
    event.target.addEventListener("keydown", (e) => {
      // @ts-ignore
      if (e.key === "Backspace") {
        if (event.target.value.length === 4) {
          setPhone("");
          setError("");
        }
      }
    })
    if (event.type === "blur") {
      if (event.target.value.length <= 4) {
        setPhone("");
        setError("This field must not be empty");
      }
    } else setCursorPosition(event.target.value.length, event.target, setPhone)
  }

  useEffect(() => {
    if (name && !nameErrorText && email && !emailErrorText && phone && !phoneErrorText && inputFile && !inputFileErrorText) {
      setFormValid(true);
    } else setFormValid(false);
  }, [name, nameErrorText, email, emailErrorText, phone, phoneErrorText, inputFile, inputFileErrorText]);

  const warningMessage = (message: string) => toast.warning(`${message}`);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @ts-ignore
    const formData = new FormData(event.target);
    const fetchForm = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${URL}users`, {
          method: "POST",
          // @ts-ignore
          headers: {"Token": token},
          body: formData
        })
        if (response.status >= 200 && response.status < 300) {
          setRegistered(true);
          getUsers();
        }
        if (response.status === 401 && !fetching) {
          setFetching(true);
          await getToken();
          await fetchForm();
        }
        if (response.status === 409) {
          const data = await response.json();
          warningMessage(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchForm();

    setName("");
    setEmail("");
    setPhone("");
    setInputFile("");
    setInputFileValue("Upload your photo");
  }

  useEffect(() => {
    if (registered) {
      setTimeout(() => {
        setRegistered(false);
      }, 3000);
    }
  }, [registered]);

  return (
    <>
      <section className={style.formBlock} id={"formBlock"}>
        <header>
          <h1>Working with POST request</h1>
        </header>
        <div className={style.formWrapper}>
          <form action="#" method="POST" onSubmit={(event) => onSubmit(event)}>
            <InputField className={style.inputField}
                        type={"text"}
                        name={"name"}
                        value={name}
                        error={!!nameErrorText}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeName(event.target.value)}
                        onBlur={(event: React.ChangeEvent<HTMLInputElement>) => onBlurName(event.target.value)}
                        label="Your name"
                        variant="outlined"
                        helperText={nameErrorText}
            />
            <InputField className={style.inputField}
                        type={"email"}
                        name={"email"}
                        value={email}
                        error={!!emailErrorText}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeEmail(event.target.value)}
                        onBlur={(event: React.ChangeEvent<HTMLInputElement>) => onBlurEmail(event.target.value)}
                        label="Email"
                        variant="outlined"
                        helperText={emailErrorText}
            />
            <InputField className={`mb-0 ${style.inputField}`}
                        type={"text"}
                        name={"phone"}
                        value={phone}
                        error={!!phoneErrorText}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => mask(event, setPhone, setPhoneErrorText)}
                        onBlur={(event: React.ChangeEvent<HTMLInputElement>) => mask(event, setPhone, setPhoneErrorText)}
                        onFocus={(event: React.ChangeEvent<HTMLInputElement>) => mask(event, setPhone, setPhoneErrorText)}
                        label="Phone"
                        variant="outlined"
                        helperText={phoneErrorText ? phoneErrorText : "+38 (XXX) XXX - XX - XX"}
            />
            <div className={style.radioButtonsBlock}>
              <h3>Select your position</h3>
              {positions.length && <RadioGroup
                defaultValue={positions[0].id}
                aria-labelledby="demo-customized-radios"
                name="customized-radios"
              >
                {positions.map(item => <RadioButton key={item.name} label={item.name} value={item.id} name={"position_id"}/>)}
              </RadioGroup>}
            </div>
            <InputFieldWithButton type={"text"}
                                  name={"photo"}
                                  value={inputFileValue}
                                  getImage={(event: React.ChangeEvent<HTMLInputElement>) => getImage(event)}
                                  label={""}
                                  helperText={inputFileErrorText}
                                  error={inputFileError}
            />
            <PrimaryButton type="submit" disabled={!formValid}>Sign up</PrimaryButton>
          </form>
        </div>
      </section>
      <ToastContainer position={"top-center"}
                      autoClose={3000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick={true}
                      rtl={false}
                      pauseOnFocusLoss={true}
                      draggable={true}
                      pauseOnHover={true}
                      theme={"light"}
      />
      {registered && <SuccessfullyRegistered/>}
    </>
  );
}