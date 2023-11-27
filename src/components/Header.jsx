import AuthModal from "./AuthModal";

export default function Header(props) {
  function handleProfileClick() {
    document.getElementById("my_modal_5").showModal();
  }

  return (
    <div className="w-full h-12 flex justify-center">
      <h1 className="text-3xl mx-auto">
        <span className="gameItalic">game</span>State
      </h1>
      {props.loggedIn ? (
        <img
          src="./loggedInUser.png"
          alt="profile icon"
          className="w-8 h-8"
          onClick={handleProfileClick}
        />
      ) : (
        <img
          src="./loggedOutUser.png"
          alt="profile icon"
          className="w-8 h-8"
          onClick={handleProfileClick}
        />
      )}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <AuthModal
            handleProfileClick={handleProfileClick}
            loggedIn={props.loggedIn}
            user={props.user}
          />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
