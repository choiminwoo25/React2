

export default  async function BlogPage() {
   await new Promise((resolve) => setTimeout(resolve, 3000));

    return(

        <div>
            <h1>
                Blog페이지
            </h1>
        </div>
    );
        
    
}