import Treecloud from './Treecloud';
import ProfileInfo from './ProfileInfo';

export default function Profile(){
    return(
            <div className="relative min-h-screen flex items-center justify-center">
              <div className="absolute w-full pointer-events-none">
                <Treecloud />
              </div>
        
              <div className="absolute w-full z-10 pointer-events-auto">
                <ProfileInfo></ProfileInfo>
              </div>
            </div>
    )
}