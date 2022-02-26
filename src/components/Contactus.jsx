import React from 'react';


const ContactUs = ()=>
{
   
        return(

            <div id="main" className="mt-4">
            <div className="container">
                <div className="row">
                   
                    <div className="col-12 text-center">
                    <div className="question-back text-center" >
                    <div className="table-responsive">
                    <table className="table">
                    
                        <thead className="thead-dark">
                              <tr>
                                    <th scope="col">Name</th>
                                    {/* <th scope="col">Name</th> */}
                                    <th scope="col">Contact Number</th>
                                   
                              </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Ronak Pradhan</td>
                                <td><a className="btn btn-info" href="https://api.WhatsApp.com/send?phone=+918342877713">WhatsApp (8342877713)</a></td>
                            </tr>

                            <tr>
                                <td>Bhakti Manakapure</td>
                                <td><a className="btn btn-info" href="https://api.WhatsApp.com/send?phone=+918178006463">WhatsApp (8178006463)</a></td>
                            </tr>
                            
                        </tbody>
                    
                    </table>
                
                    </div>
                        
                        
                    </div>
                    
                       
                    </div>
                    
                        
                </div>
                
                       
              
            </div>
                
        </div>

        );

}

export default ContactUs;