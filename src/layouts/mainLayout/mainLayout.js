import Nav from '../components/Navbar/Nav';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/footer';

function MainLayout({ children }) {
    return (
        <div>
            <Header />
            <Nav />
            {children}
            <Footer />
        </div>
    );
}

export default MainLayout;
