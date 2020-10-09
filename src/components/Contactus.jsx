import React from 'react';


const ContactUs = ()=>
{
   
        return(

            <div id="main" className="mt-4">
            <div className="container">
                <div className="row">
                   
                    <div className="col-12 text-center">
                    <div className="question-back text-center" style={{opacity: 0.7}}>
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
                                <td>Omkar Masur</td>
                                <td><a className="btn btn-info" href="https://api.WhatsApp.com/send?phone=+919930147279">WhatsApp (9930147279)</a></td>
                            </tr>

                            <tr>
                                <td>Shubham Pathak</td>
                                <td><a className="btn btn-info" href="https://api.WhatsApp.com/send?phone=+918130180208">WhatsApp (8130180208)</a></td>
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