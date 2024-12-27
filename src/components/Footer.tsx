// Footer component in React

const Footer = () => {
    return (
      <footer className=" fixed bottom-0 py-4 mt-8 w-[90%]">
        <div className="w-[100%] mx-auto px-6 flex justify-around items-center">
         
          <div className="flex space-x-6">
            <a href="https://github.com/bhagirathpaliyal" target="_blank" rel="noopener noreferrer" className=" text-[#B0B0B0] hover:text-gray-400">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/bhagirath-paliyal" target="_blank" rel="noopener noreferrer" className="text-[#B0B0B0] hover:text-gray-400">
              LinkedIn
            </a>
            <a href="https://twitter.com/b_paliyal" target="_blank" rel="noopener noreferrer" className="text-[#B0B0B0] hover:text-gray-400">
              Twitter
            </a>
            
          </div>
  
       
          <div className="text-sm text-[#B0B0B0]">
            &copy; {new Date().getFullYear()} Bhagirath Paliyal.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  