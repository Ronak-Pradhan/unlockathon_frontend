import React, { Component } from 'react';

class Events extends Component
{
    render()
    {
        return(
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-lg-12 col-xs-12 table1" >
                  <h3 className="text-center">Other Events</h3>
                  
                      <table className="table">
                          <thead className="thead-dark">
                              <tr>
                                    <th scope="col">Event</th>
                                    <th scope="col">Classroom and Days</th>
                              </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>Crown Jewel</td>
                                    <td><a href="https://crownjewel.istemanipal.com/">Registration Link</a></td>
                                </tr>
                                <tr className="pure-table-odd">
                                    <td>Oasis</td>
                                    <td>AB5 403 25th January</td>
                                </tr>
                                <tr className="pure-table-odd">
                                    <td>Talk by Mr.Sunil Varkey</td>
                                    <td><a href="https://forms.gle/BSeitmHQkE2bfXe2A">MS Teams, 4th March 6pm</a></td>
                                </tr>
                                <tr className="pure-table-odd">
                                    <td>Talk by Khushhal Kaushik</td>
                                    <td><a href="https://forms.gle/iELZ4YqCnTXpx2Hg6" style={{textDecoration:'none'}}>MS Teams, 7th March 12pm</a></td>
                                </tr>
                            </tbody>

                      </table>
                  
              </div>
             </div>
          </div>
        );
    }
}

export default Events;