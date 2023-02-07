
import { StarIcon, UserIcon } from '@heroicons/react/24/outline'

const Header = () => {
    return (
        <>
            <div className="z-1000 navbar flex w-full justify-center bg-base-100 drop-shadow-xl">
                <div className="flex w-full max-w-md justify-between">
                    <div className="flex">
                        <a className="text-xl normal-case">find</a>
                    </div>
                    <div className="flex">
                        <div className="btn-ghost btn-circle avatar btn">
                            <StarIcon className="text-black-500 h-6 w-6" />
                        </div>
                        <div className="dropdown-end dropdown">
                            <label
                                tabIndex={0}
                                className="btn-ghost btn-circle avatar btn"
                            >
                                <UserIcon className="text-black-500 h-6 w-6" />
                            </label>
                            <ul
                                tabIndex={0}
                                className="z-6000 dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
                            >
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li>
                                    <a>Settings</a>
                                </li>
                                <li>
                                    <a>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header
