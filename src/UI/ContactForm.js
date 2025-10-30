import { useEffect, useRef, useState } from "react";

export default function ContactForm(props) {
	const dialog = useRef(null);
	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const messageRef = useRef(null);
	const formRef = useRef(null);
	const abortControllerRef = useRef(null);

	// State management
	const [sendingMessage, setSendingMessage] = useState(false);
	const [errorSendingMessage, setErrorSendingMessage] = useState(false);
	const [buttonText, setButtonText] = useState("Lets Talk!");
	const [emailIsInvalid, setEmailIsInvalid] = useState(false);
	const [showSuccessDialog, setShowSuccessDialog] = useState(false);
	const [showFailureDialog, setShowFailureDialog] = useState(false);
	const [failureMessage, setFailureMessage] = useState("");
	const [dialogHiding, setDialogHiding] = useState({
		success: false,
		failure: false,
	});

	useEffect(() => {
		console.log(props.IsOpen);
		if (props.IsOpen) {
			console.log("is open");
			dialog.current?.show();
		} else {
			dialog.current?.close();
		}
	}, [props.IsOpen]);

	/**
	 * closes the dialog containing the form and removes the blur from
	 * the background
	 *
	 * @function
	 */
	function closeForm() {
		//remove the blur from background elements
		let main = document.querySelector("header + *");
		let header = document.querySelector("header");
		let footer = document.querySelector("footer");
		footer?.classList.remove("blur");
		main?.classList.remove("blur");
		// header?.classList.remove('blur');

		//close the dialog
		props.setisOpen(false);
	}

	/**
	 * if email validation has failed change the css of the email
	 * input field so that the borders and outlines are red
	 *
	 * @function
	 */
	function changeEmailCSS() {
		//check the validity of the email
		let emailValue = emailRef.current?.value || "";
		let emailValidity = validateEmail(emailValue);

		//update state instead of manipulating DOM
		setEmailIsInvalid(!emailValidity && emailValue !== "");
	}

	/**
	 * checks whether the email input string passes the regex test
	 *
	 * @function
	 * @param {string} [email] - takes in email inputed by the user
	 */
	function validateEmail(email) {
		var re =
			/^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
		return re.test(email);
	}

	async function submitForm() {
		console.log("pressed submit");
		//check email fields for validity and throw alert if not valid
		let from_name = nameRef.current.value;
		let emailId = emailRef.current.value;
		let message = messageRef.current.value;

		if (from_name === "" || !validateEmail(emailId) || message === "") {
			alert("please fill all inputs, or email invalid");
			return;
		}
		//grab from captcha
		var formData = new FormData(formRef.current);
		var captchaResponse = formData.get("g-recaptcha-response");

		//json stringify the data to be sent in the body of the post
		//method to the server
		let data = JSON.stringify({
			from_name: from_name,
			emailId: emailId,
			message: message,
			captcha: captchaResponse,
		});
		//let url = 'http://localhost:8000/sendEmail'; //local url
		let url = "https://personal-website-six-brown-33.vercel.app/sendEmail"; //vercel url

		abortControllerRef.current?.abort();
		abortControllerRef.current = new AbortController(); // Fixed typo: was "curret"

		setSendingMessage(true);
		setErrorSendingMessage(false);

		try {
			console.log("trying to fetch");

			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: data,
				signal: abortControllerRef.current.signal,
			});

			if (!response.ok) {
				throw new Error(
					"Connection established but unexpected answer received"
				);
			}

			setSendingMessage(false);
			setErrorSendingMessage(false);
			setButtonText("Message Sent!");
			handleMessageResultDialog(1, null);
		} catch (error) {
			if (error.name === "AbortError") {
				console.log("too many requests, please wait");
				return;
			}
			setSendingMessage(false);
			setErrorSendingMessage(true);
			handleMessageResultDialog(0, error);
		}
	}

	/**
	 * shows a success dialog if passed in 1 or a failure dialog
	 * if a 0 is passed in
	 *
	 * @function
	 * @param {int} [status] - binary whether the message was successful or not
	 * @param {Error} [error] - error object if failure occurred
	 */
	function handleMessageResultDialog(status, error) {
		if (status === 1) {
			// Success
			setShowSuccessDialog(true);
			setDialogHiding((prev) => ({ ...prev, success: false }));

			// Start hiding animation after 2 seconds
			setTimeout(() => {
				setDialogHiding((prev) => ({ ...prev, success: true }));
			}, 2000);

			// Close dialog after animation completes
			setTimeout(() => {
				setShowSuccessDialog(false);
				setDialogHiding((prev) => ({ ...prev, success: false }));
			}, 2900);
		} else {
			// Failure
			setFailureMessage(error?.message || "Failed! Check logs!");
			setShowFailureDialog(true);
			setDialogHiding((prev) => ({ ...prev, failure: false }));

			// Start hiding animation after 2 seconds
			setTimeout(() => {
				setDialogHiding((prev) => ({ ...prev, failure: true }));
			}, 2000);

			// Close dialog after animation completes
			setTimeout(() => {
				setShowFailureDialog(false);
				setDialogHiding((prev) => ({ ...prev, failure: false }));
			}, 2900);
		}
	}

	return (
		<dialog
			ref={dialog}
			className="contactMeDialog"
			id="contactMe"
			aria-modal="true"
		>
			<div id="dialogHeader">
				<a href="">Nikan.</a>
				<button id="closeButton" onClick={closeForm} aria-label="close">
					X
				</button>
			</div>

			<form ref={formRef} id="contactMeForm">
				<div id="inputFields">
					<label htmlFor="Name">
						Name & Last Name
						<input
							ref={nameRef}
							name="Name"
							id="Name"
							placeholder="John Doe"
							required
						/>
					</label>

					<label htmlFor="Email">
						Email
						<input
							ref={emailRef}
							onBlur={changeEmailCSS}
							type="email"
							id="Email"
							className={emailIsInvalid ? "invalid" : ""}
							placeholder="example@gmail.com"
							required
						/>
						<span
							id="emailSpan"
							style={{ display: emailIsInvalid ? "block" : "none" }}
						>
							Invalid Email
						</span>
					</label>

					<label htmlFor="Message">
						Message
						<textarea
							ref={messageRef}
							name="Message"
							id="Message"
							required
							placeholder="Enter your message here..."
						/>
					</label>
				</div>

				<div id="contactInfo">
					<h3>How to reach me:</h3>
					<h4>Email</h4>
					<p>nikanostovan@gmail.com</p>
					<h4>Phone Number</h4>
					<p>(310)-987-2231</p>

					<div id="buttonWrap" className="buttonWrap">
						<div
							className="g-recaptcha"
							data-sitekey="6LcsvdwpAAAAANF3dMzaR0u2rzFaK1cygq_x969E"
						/>
						<button
							id="formButton"
							className="contactButton"
							onClick={(e) => {
								e.preventDefault();
								submitForm();
							}}
							aria-label="Submit contact info"
						>
							{!sendingMessage && !errorSendingMessage && (
								<span>{buttonText}</span>
							)}
							{sendingMessage && (
								<div className="sidebarLoading">
									Loading{" "}
									<span>
										<span></span>
									</span>
								</div>
							)}
							{errorSendingMessage && (
								<span>
									Error!!
									<img
										className="formRetry"
										alt="retry icon"
										src={
											process.env.PUBLIC_URL +
											"./Assets/App/Cards/refreshIcon.svg"
										}
									/>
								</span>
							)}
						</button>
					</div>
				</div>
			</form>

			{/* Success Dialog */}
			<dialog
				className={`notification ${dialogHiding.success ? "hiding" : ""}`}
				id="messageSuccessDialog"
				open={showSuccessDialog}
				aria-live="assertive"
				role="alertdialog"
				aria-labelledby="SuccessAlert"
			>
				<div>
					<img src="Assets/Main/Dialog/Success.png" alt="Success" />
					<h4 id="SuccessAlert">Message sent!</h4>
				</div>
			</dialog>

			{/* Failure Dialog */}
			<dialog
				className={`notification ${dialogHiding.failure ? "hiding" : ""}`}
				id="messageFailureDialog"
				open={showFailureDialog}
				aria-live="assertive"
				role="alertdialog"
				aria-labelledby="FailureAlert"
			>
				<div>
					<img src="Assets/Main/Dialog/Failure.png" alt="Failure" />
					<h4 id="FailureAlert">{failureMessage}</h4>
				</div>
			</dialog>
		</dialog>
	);
}
