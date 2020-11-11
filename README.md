I built this solution with the principles of Dependency Injection and MVC in mind. By passing through dependencies it allows for simpler testing (mocking dependencies) as well as replacing dependencies that adhere to the same interface.

# Instructions

To run the application:

```
npm install
npm run build
npm run start
```

To run the tests:

```
npm run test
```

# Replacing User Interface

Replacing the user interface is straight forward by re-using the Controller and StateManager and creating a new View. The CLI class is an example of a View. If we wanted to replace it with a web interface you would only need to initialise the dependencies then pass them into a Controller instance which a View could then use to achieve the same business logic.

I used the State Pattern to manage application state which can be shared across any implementation of a user inteface. See an example of a React web interface using these re-usable classes in `example_web_view.ts`. The StateManager class knows how to handle input and which states to transition. This method allows us to replace the user interface but also increase complexity of application state without heavy rewrites.

# Production Readiness

To make this application production ready you would need to start with a CI/CD pipeline integrated into version control. This will allow us to run automated tests on feature branches as well as any other integrity checks (linting, security, complexity).

This project has good test coverage through unit tests but we would also want to build integration and end-to-end tests. Integration tests assert that the components function when used together while E2E tests prove the user can achieve their intended goals by replicating user actions as close as possible.

I believe code can and should be self-documenting with well principled coding standards. However we would still want to document processes, patterns, assumptions and instructions. This can be included in version control and be part of the CI/CD build pipeline.

# Assumptions

1. It is not clearly defined how the frequency status should be ordered in the case of same frequency so for the sake of keeping things deterministic, I sort on the key also.
2. Pausing the timer in the middle of a cycle then resuming will not resume at the same point in between the cycles, it will start from the beginning.
