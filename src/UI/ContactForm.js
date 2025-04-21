import userEvent from "@testing-library/user-event";
import { useEffect, useRef, useState } from "react";

export default function ContactForm(props) {
	const dialog = useRef(null);
	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const messageRef = useRef(null);
	const formRef = useRef(null);
	const buttonRef = useRef(null);
	const successDialogRef = useRef(null);
	const failureDialogRef = useRef(null);
	const [sendingMessage, setSendingMessage] = useState(null);
	const [errorSendingMessage, setErrorSendingMessage] = useState(false);
	const abortControllerRef = useRef(null);
	useEffect(() => {
		console.log(props.IsOpen);
		if (props.IsOpen) {
			console.log("is open");
			dialog.current.show();
		} else {
			dialog.current.close();
		}
	}, [props.IsOpen]);

	/**
	 * closes the dialog  containing the form and removes the blur from
	 * the background
	 *
	 * @function
	 */
	function closeForm() {
		//remove the blur from background elements
		let main = document.querySelector("header + *");
		let header = document.querySelector("header");
		let footer = document.querySelector("footer");
		footer.classList.remove("blur");
		main.classList.remove("blur");
		// header.classList.remove('blur');

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
		let emailField = document.getElementById("Email");
		let emailVlaue = emailField.value;
		let emailValidity = validateEmail(emailVlaue);

		//if email is invalid add invalid to the class list
		if (!emailValidity) {
			emailField.classList.add("invalid");
			document.getElementById("emailSpan").style.display = "block";
		}

		//if email is valid remove invalid class list
		if (emailValidity || emailVlaue == "") {
			//remove the class or sth
			emailField.classList.remove("invalid");
			document.getElementById("emailSpan").style.display = "none";
		}
	}
	/**
	 * checks wether the email input string passes the regex test
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

		if (from_name == "" || !validateEmail(emailId) || message == "") {
			alert("please fill all inputs, or email invalid");
			return;
		}
		//grap from captcha
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
		let url = "https://personal-website-six-brown-33.vercel.app/sendEmai"; //vercel url

		abortControllerRef.current?.abort();
		abortControllerRef.curret = new AbortController();

		setSendingMessage(true);
		try {
			console.log("tyring to fetch");

			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: data,
			});
			if (!response.ok) {
				throw new Error(
					"Connection established but unexpected answer recieved"
				);
			}
			setSendingMessage(false);
			setErrorSendingMessage(false);
			handleMessageResultDialog(1, null);
			buttonRef.current.innerText = "Message Sent!";
		} catch (error) {
			if (error.name === "AbortError") {
				console.log("too many reqeust, please wait");
				return;
			}
			setErrorSendingMessage(true);
			handleMessageResultDialog(0, error);
		} finally {
			setSendingMessage(false);
		}
	}
	/**
	 * shows a success dialog if passed in 1 or a failure dialog
	 * if a 0 is passsed in
	 *
	 * @function
	 * @param {int} [status] - binary wether the message was successful or not
	 */
	function handleMessageResultDialog(status, error) {
		let dialog = null;
		//get the current dialog
		if (status == 1) {
			dialog = successDialogRef.current;
		} else {
			dialog = failureDialogRef.current;
			dialog.querySelector("#FailureAlert").innerText = error;
		}

		//open the dialog and close it after the animation is done
		//through changing the class by adding hiding and removing it
		dialog.show();
		setTimeout(() => {
			dialog.classList.add("hiding");
		}, 2000);
		setTimeout(() => {
			dialog.classList.remove("hiding");
			dialog.close();
		}, 2900);
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
						></input>
					</label>

					<label htmlFor="Email">
						Email
						<input
							ref={emailRef}
							onBlur={changeEmailCSS}
							type="email"
							id="Email"
							placeholder="example@gmail.com"
							required
						></input>
						<span id="emailSpan">Invalid Email</span>
					</label>

					<label htmlFor="Message">
						Message
						<textarea
							ref={messageRef}
							name="Message"
							id="Message"
							required
							placeholder="Enter your message here..."
						></textarea>
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
						></div>
						<button
							ref={buttonRef}
							id="formButton"
							className="contactButton"
							onClick={(e) => {
								e.preventDefault();
								submitForm();
							}}
							aria-label="Submit contact info"
						>
							{sendingMessage == null && <span>Lets Talk!</span>}
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
									></img>
								</span>
							)}
						</button>
					</div>
				</div>
			</form>
			<dialog
				ref={successDialogRef}
				className="notification"
				id="messageSuccessDialog"
				aria-live="assertive"
				role="alertdialog"
				aria-labelledby="SuccessAlert"
			>
				<div>
					<img src="Assets/Main/Dialog/Success.png"></img>
					<h4 id="SuccessAlert">Message sent!</h4>
				</div>
			</dialog>

			<dialog
				ref={failureDialogRef}
				className="notification"
				id="messageFailureDialog"
				aria-live="assertive"
				role="alertdialog"
				aria-labelledby="FailureAlert"
			>
				<div>
					<img src="Assets/Main/Dialog/Failure.png"></img>
					<h4 id="FailureAlert">Failed! Check logs!</h4>
				</div>
			</dialog>
		</dialog>
	);
}
