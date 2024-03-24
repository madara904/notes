import SkeletonLoader from "./SkeletonLoader";



const Loading = ({ isLoading, CardNo }) => {


    const array = Array(CardNo).fill({})
    

    return (
        <div className="container mx-auto grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
         { isLoading && array.map(id => ( 
                <SkeletonLoader key={id} />
            ))
        }

        </div>
    )
}
  export default Loading;
