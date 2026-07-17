import Header from "../../../components/Header";

export default function layout({children}) {
  return (
    <div>
        <Header/>
        {children}
    </div>
  )
}
