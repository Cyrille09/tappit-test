const API_URL = Cypress.env('apiUrl');

describe('People record', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  /**
   * People API testing
   */
  it('GET People API Record', () => {
    cy.request(`${API_URL}/ceb09528-8228-4a95-b7d9-c1f945023c92`).then(
      (res) => {
        expect(res.status).equal(200);
        expect(res.body).has.length(11);
      }
    );
  });

  /**
   * Person API testing
   */
  it('GET a Person Record', () => {
    const personId = 1;
    cy.request(
      `${API_URL}/45928af0-9bd1-4eb0-a9a1-55845a009e8d/${personId}`
    ).then((res) => {
      expect(res.status).equal(200);
      expect(res.body).has.property('firstName', 'Frank');
    });
  });
});
