import React from "react";
import ReactDOM from "react-dom";
import ModalContent from "./ModalContent";

const CustomModal = ({ isShowing, hide, setUpdate }) =>
	isShowing
		? ReactDOM.createPortal(
				<React.Fragment>
					<div className="custom-modal-overlay"></div>

					<div
						className="custom-modal-wrapper"
						aria-modal
						aria-hidden
						tabIndex={-1}
						role="dialog"
					>
						<div className="custom-modal">
							<button
								type="button"
								className="custom-modal-close-button"
								data-dismiss="custom-modal"
								aria-label="Close"
								onClick={hide}
							>
								<span aria-hidden="true">&times;</span>
							</button>
							<ModalContent hide={hide} setUpdate={setUpdate} />
						</div>
					</div>
				</React.Fragment>,
				document.body
		  )
		: null;

export default CustomModal;
