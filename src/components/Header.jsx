import Modal from "./Auth/Modal";
import useUserStore from "@/stores/userStore";
import { Link } from "react-router-dom";
import logged from "@/assets/icons/loggedInUser.png";
import notLogged from "@/assets/icons/loggedOutUser.png";

export default function Header(props) {
  const isLogged = useUserStore((state) => state.isLogged);
  function authOpen() {
    document.getElementById("my_modal_5").showModal();
  }
  function authClose() {
    document.getElementById("my_modal_5").close();
  }

  return (
    <div className="w-full h-10 flex items-center justify-center">
      <h1 className="py-1 font-bold text-4xl mx-auto bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent">
        <Link to="/">
          <span className="italic">game</span>State
        </Link>
      </h1>
      <img
        src={isLogged ? logged : notLogged}
        alt="profile icon"
        className="w-8 h-8"
        onClick={authOpen}
      />
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <Modal authClose={authClose} />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
