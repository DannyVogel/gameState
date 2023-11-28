import useUserStore from "@/stores/userStore";
import LoggedUser from "@/components/Home/LoggedUser";
import Default from "@/components/Home/Default";

export default function Index() {
  const UID = useUserStore((state) => state.UID);
  return <>{!UID ? <Default /> : <LoggedUser />}</>;
}
