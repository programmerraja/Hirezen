# Interview Pilot

A tool for generating interview questions based on a candidate's resume using OpenAI.

## Features

- Upload a candidate's resume (PDF)
- Generate tailored interview questions based on the resume and job role
- Save and manage multiple interviews
- Redact personal information from resumes for privacy
- Export questions and answers to PDF or text format
- Customize question types and difficulty levels

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory based on `.env.example`:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
   Get your OpenAI API key from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Upload a candidate's resume in PDF format
2. Select the job role and experience level
3. Generate interview questions
4. Review and customize questions as needed
5. Export or save the interview for later reference

## Technologies Used

- React + Vite
- OpenAI API
- PDF.js for resume parsing
- Tailwind CSS for styling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
