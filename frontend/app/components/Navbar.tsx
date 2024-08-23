import Image from "next/image";
const Navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center relative h-12">
        <div>
          Spotify Logo
          <a className="flex-row m-5 items-center"></a>
        </div>
        <div className="flex items-center absolute left-0 right-0 flex-1 justify-center gap-0 w-full">
          <button>Home</button>
          <div>
            <form>
              <div>
                <button>Search Logo</button>
              </div>
              <div>
                <input type="search" />
              </div>
              <div>
                <div>
                  <button>Browse</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div>
          <a>
            <span className="flex">
              <span>Bell</span>
              <span>Friends activity</span>
            </span>
          </a>
          <div>
            <button>
              <svg></svg>
              <div>
                <span>New Releases</span>
                <svg></svg>
              </div>
            </button>
          </div>
          <button>
            <div>
              <figure>
                <Image src="" alt="" />
              </figure>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
