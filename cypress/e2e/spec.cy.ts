describe("Todo Test", () => {
  it("Visit TodoList HomePage", () => {
    cy.visit("http://localhost:3000"); // 해당 주소로 방문

    cy.get("input").type("잠자기").should("have.value", "잠자기"); // input에 '잠자기' 문자 입력 후 '잠자기' 문구가 있는지 확인

    cy.get("button").should("contain", "제출").click(); // 제출 버튼을 찾아서 누르기

    cy.get("li").should("contain", "잠자기"); // '잠자기' 문자를 가진 li 태그 찾기

    cy.get("#delete-button").trigger("click"); // 삭제 버튼 누르고
    cy.get("li").should("not.exist"); // li 존재하지 유무 확인
  });
});
