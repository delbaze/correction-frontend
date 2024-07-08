import Header from "./Header";

function Layout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
