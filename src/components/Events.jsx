import React, { Component } from 'react';

class Events extends Component
{
    render()
    {
        return(
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-lg-12 col-xs-12 table1" style={{opacity: 0.7}}>
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
                                    <td>Codeburst</td>
                                    <td>AB5 403 24th January</td>
                                </tr>
                                <tr className="pure-table-odd">
                                    <td>Rig-It-Up</td>
                                    <td>AB5 403 25th January</td>
                                </tr>
                                <tr>
                                    <td>Exquizite</td>
                                    <td>AB5 406 22nd January & 23rd January</td>
                                </tr>
                                <tr className="pure-table-odd">
                                    <td>Lazertron</td>
                                    <td>AB5 403 22nd January</td>
                                </tr>

                <tr>
                <td>Treasure Trove</td>
                <td>AB5 406 24th January & 26th January</td>
              </tr>

                <tr className="pure-table-odd">
                <td>Gaming</td>
                <td>AB5 407 23rd January to 25th January</td>
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