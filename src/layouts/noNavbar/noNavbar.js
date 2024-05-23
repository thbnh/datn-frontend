import Header from '../components/Header/Header';
import Footer from '../components/Footer/footer';

function NoNavbar({ children }) {
    return (
        <div className="wrapper">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default NoNavbar;
