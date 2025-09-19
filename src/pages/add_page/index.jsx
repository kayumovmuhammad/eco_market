import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import classes from './style.module.css';
import categories from '../../menu-items/categories';
import CancelIcon from '@mui/icons-material/Cancel';
import { MuiTelInput } from 'mui-tel-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const imagePreviewSize = '150px';

function Image({ url, index, deleteImage }) {
  const [isHover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      style={{ position: 'relative', width: imagePreviewSize, height: imagePreviewSize }}
    >
      <img
        src={url}
        alt=""
        style={{ width: imagePreviewSize, height: imagePreviewSize, borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.1)' }}
      />
      {isHover && (
        <CancelIcon
          onClick={() => {
            deleteImage(index);
          }}
          sx={{ position: 'absolute', top: '5px', right: '5px', '&:hover': { cursor: 'pointer' } }}
        ></CancelIcon>
      )}
    </div>
  );
}

export default function AddPage() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [description, setDescription] = useState('');

  const handleChangePhone = (newPhone, info) => {
    setPhone(newPhone);

    if (newPhone) {
      try {
        const phoneNumber = parsePhoneNumberFromString(newPhone, info.countryCode);
        if (phoneNumber && phoneNumber.isValid()) {
          setError('');
        } else {
          setError('*Введите корректный номер телефона');
        }
      } catch (err) {
        setError('*Ошибка при обработке номера телефона');
      }
    } else {
      setError('*Введите корректный номер телефона');
    }
  };

  const [imageURLs, setImageURLs] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    let urls = [];
    for (let file of acceptedFiles) {
      // console.log(file.type);

      if (file.type.startsWith('image/')) {
        urls.push(URL.createObjectURL(file));
      }
    }
    setImageURLs((preImageURLs) => {
      return [...preImageURLs, ...urls];
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);

  const handleChange = (event) => {
    setCategory(event.target.value);
    setCategoryError("");
  };

  const deleteImage = (index) => {
    const prImages = [...imageURLs];
    prImages.splice(index, 1);
    setImageURLs(prImages);
  };

  const handleSubmit = () => {
    let isError = false;
    if (!category) {
      isError = true;
      setCategoryError(true);
    }
    if (!title) {
      isError = true;
      setTitleError('*Название не может быть пустым');
    }
    if (!phone) {
      isError = true;
      setError('*Введите корректный номер телефона');
    }
    if (!!titleError) {
      isError = true;
    }
    if (!!error) {
      isError = true;
    }
    if (isError) {
      return;
    }

    console.log('title: ', title);
    console.log('category: ', category);
    console.log('phone: ', phone);
    console.log('description: ', description);
    console.log('images: ', imageURLs);

    console.log('Submitting to backend...');
  };

  return (
    <Box sx={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
      <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <TextField
          error={!!titleError}
          helperText={titleError}
          sx={{ width: '300px' }}
          id="outlined-basic"
          label="Название"
          variant="outlined"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            if (event.target.value == '') {
              setTitleError('*Название не может быть пустым');
            } else {
              setTitleError('');
            }
          }}
        />
        <FormControl>
          <InputLabel error={categoryError} id="demo-simple-select-label">
            Категория
          </InputLabel>
          <Select
            sx={{ width: '300px', maxWidth: '100%' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Age"
            error={categoryError}
            onChange={handleChange}
          >
            {categories.children.map((item) => (
              <MenuItem value={item.title}>{item.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <TextField sx={{ width: '300px' }} id="outlined-basic" label="" variant="outlined" /> */}
      </Box>
      <MuiTelInput
        sx={{ maxWidth: '610px', marginTop: '20px', width: '100%' }}
        value={phone}
        onChange={handleChangePhone}
        label="Номер телефона"
        defaultCountry="TJ"
        variant="outlined"
        fullWidth
        error={!!error}
        helperText={error}
        inputProps={{ inputMode: 'tel' }}
        focusOnSelectCountry
      />
      <TextField
        sx={{ maxWidth: '610px', marginTop: '20px', width: '100%' }}
        id="outlined-multiline-static"
        label="Описание"
        multiline
        rows={6}
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />

      <h3 style={{ marginBottom: 0, marginTop: '30px', fontWeight: 'normal', color: '#595959' }}>Выберите изображения</h3>
      <ul
        style={{
          display: 'flex',
          listStyleType: 'none',
          width: '100%',
          gap: '10px',
          overflow: 'auto',
          padding: '10px',
          paddingLeft: 0,
          marginTop: 0
        }}
      >
        <li>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={classes.add_button}>
              <AddCircleIcon sx={{ height: '30px', width: '30px' }} />
            </div>
          </div>
        </li>
        {imageURLs.map((url, index) => {
          return (
            <li key={index}>
              <Image url={url} index={index} deleteImage={deleteImage}></Image>
            </li>
          );
        })}
      </ul>
      <Button onClick={handleSubmit} sx={{ fontSize: '16px' }} variant="contained">
        Опубликовать
      </Button>
    </Box>
  );
}
